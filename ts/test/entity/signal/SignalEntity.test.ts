

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


describe('SignalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Signal()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Signal().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'signal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"acked_at":{"a":true,"h":"Acked At","n":"acked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"acked_at","index$":0},"acked_by":{"a":true,"h":"Acked By","n":"acked_by","r":false,"sh":"Who acked the signal, read from `acked_by_user_id`.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"acked_by","index$":1},"agent_runs":{"a":true,"h":"Agent Runs","n":"agent_runs","r":false,"sh":"Dispatched-run summary (docs §6c).","t":"`$OBJECT`","key$":"agent_runs","index$":2},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":3},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"sh":"The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g.","t":"`$OBJECT`","key$":"attribution","index$":4},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"sh":"ISO8601 row insert time — retention math and debugging only.","t":"`$STRING`","key$":"created_at","index$":5},"dedupe_key":{"a":true,"h":"Dedupe Key","n":"dedupe_key","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"dedupe_key","index$":6},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"hosted_app_id","index$":7},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The signal's own `sig_…` public id — also the paging cursor value.","t":"`$STRING`","key$":"id","index$":8},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"sh":"A frozen taxonomy kind (§1) or an `app.custom.*` kind.","t":"`$STRING`","key$":"kind","index$":9},"links":{"a":true,"h":"Links","n":"links","r":true,"sh":"Canonical, relative API paths built from real routes (docs §6a).","t":"`$OBJECT`","key$":"links","index$":10},"occurred_at":{"a":true,"h":"Occurred At","n":"occurred_at","r":true,"sh":"ISO8601 domain event time — what the UI displays and `since` filters on.","t":"`$STRING`","key$":"occurred_at","index$":11},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":12},"payload":{"a":true,"h":"Payload","n":"payload","r":true,"sh":"Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known.","t":"`$OBJECT`","key$":"payload","index$":13},"recovery":{"a":true,"h":"Recovery","n":"recovery","r":false,"sh":"Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d).","t":"`$OBJECT`","key$":"recovery","index$":14},"resolution":{"a":true,"h":"Resolution","n":"resolution","r":false,"sh":"Recovery pairing (docs §6b).","t":"`$OBJECT`","key$":"resolution","index$":15},"severity":{"a":true,"h":"Severity","n":"severity","r":true,"sh":"Severity levels (docs §2, reusing `AlertRule::SEVERITIES`).","t":"`$STRING`","key$":"severity","index$":16},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Provenance envelope (docs §6e), a sibling of the frozen `payload`.","t":"`$OBJECT`","key$":"source","index$":17},"subject_id":{"a":true,"h":"Subject Id","n":"subject_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject_id","index$":18},"subject_type":{"a":true,"h":"Subject Type","n":"subject_type","r":true,"sh":"Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject_type","index$":19},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"sh":"One-line, kind-composed human sentence for the feed row (docs §6d, e.g.","t":"`$STRING`","key$":"summary","index$":20}},"id":{"field":"id","name":"id"},"name":"signal","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/signals/{id}/ack","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/signals/{id}/ack","q":{"$action":"ack","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signals"},{"var":"id"},{"lit":"ack"}],"t":{"req":"`reqdata`","res":"`body.signal`"},"index$":0},{"a":true,"bf":["all","before_id","hosted_app_id","ids","integration_id","kind","min_severity","recovered_only","severity","since","source"],"co":{"id":"POST /api/v1/organizations/{organization_id}/signals/ack","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/signals/ack","q":{"$action":"ack","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signals"},{"lit":"ack"}],"t":{"req":{"all":"`reqdata.all`","before_id":"`reqdata.before_id`","hosted_app_id":"`reqdata.hosted_app_id`","ids":"`reqdata.ids`","integration_id":"`reqdata.integration_id`","kind":"`reqdata.kind`","min_severity":"`reqdata.min_severity`","recovered_only":"`reqdata.recovered_only`","severity":"`reqdata.severity`","since":"`reqdata.since`","source":"`reqdata.source`"},"res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/signals","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/signals","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"signals"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signals","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"after_id","or":"after_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"before_id","or":"before_id","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"hosted_app_id","or":"hosted_app_id","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"integration_id","or":"integration_id","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"kind","or":"kind","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":5},{"a":true,"explode":true,"k":"query","n":"min_severity","or":"min_severity","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"order","or":"order","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"severity","or":"severity","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"since","or":"since","r":false,"style":"form","t":"`$STRING`","index$":9},{"a":true,"explode":true,"k":"query","n":"source","or":"source","r":false,"style":"form","t":"`$STRING`","index$":10},{"a":true,"explode":true,"k":"query","n":"subscription_id","or":"subscription_id","r":false,"style":"form","t":"`$STRING`","index$":11},{"a":true,"explode":true,"k":"query","n":"unacked","or":"unacked","r":false,"style":"form","t":"`$BOOLEAN`","index$":12}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signals","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signals"}],"t":{"page":{"cursor":"`body.next_cursor`","more":"`body.has_more`"},"req":"`reqdata`","res":"`body.signals`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signals/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signals/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signals"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.signal`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signals/{id}/agent_prompt","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signals/{id}/agent_prompt","q":{"$action":"agent_prompt","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signals"},{"var":"id"},{"lit":"agent_prompt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"signal","name__orig":"signal","Name":"Signal","name_":"signal","name-":"signal","NAME":"SIGNAL","index$":469}, {"active":true,"entity":"signal","key$":"BasicSignalFlow","kind":"basic","name":"BasicSignalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"signal_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"signal_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"signal_ref01","srcdatavar":"signal_ref01_data","suffix":"_dt0"},"m":{"id":"signal01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-signal_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/signals/{id}","record":{"organization_id":"organization_id"}}]}, 'Signal', {"POST /api/v1/organizations/{organization_id}/signals/{id}/ack":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/signals/ack":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"ids":{"type":"array","items":{"type":"string"},"description":"Explicit `sig_…` ids. When present every other key is ignored."},"before_id":{"type":"string","description":"Inclusive upper bound (`sig_…`) — ack matching signals at or before it."},"kind":{"type":"string","description":"Single kind or comma-separated list."},"severity":{"type":"string","description":"Single severity or comma-separated list."},"min_severity":{"type":"string","description":"Severity levels (docs §2, reusing `AlertRule::SEVERITIES`).","enum":["info","warning","error","critical"],"x-ref":"#/components/schemas/OpsSignalSeverity"},"hosted_app_id":{"type":"string"},"source":{"type":"string","description":"Single source provider or comma-separated list (docs §6e). Alone it satisfies the \"explicitly scoped\" guard."},"integration_id":{"type":"string","description":"One signal integration — raw id, or `sint_…` once that model ships."},"since":{"type":"string"},"all":{"type":"boolean","description":"Opt in to an otherwise-unconstrained ack of every unacked signal."},"recovered_only":{"type":"boolean","description":"Narrow to signals whose `resolution.resolved` is true. Composes with every other filter and alone satisfies the \"explicitly scoped\" guard."}},"additionalProperties":false,"x-ref":"#/components/schemas/OpsSignalBulkAckRequest"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/signals":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/organizations/{organization_id}/signals":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"after_id","required":false,"description":"Exclusive cursor (`sig_…`). Ascending: return signals newer than it. Descending: alias for `before_id`.","schema":{"type":"string"},"index$":1},{"in":"query","name":"before_id","required":false,"description":"Exclusive cursor (`sig_…`) for `order=desc` — return signals older than it.","schema":{"type":"string"},"index$":2},{"in":"query","name":"order","required":false,"description":"Scan direction over the id cursor. Defaults to `asc` (oldest-first).","schema":{"type":"string","enum":["asc","desc"]},"index$":3},{"in":"query","name":"limit","required":false,"description":"Signals per page (default 50, capped at 100).","schema":{"type":"integer","minimum":1,"maximum":100},"index$":4},{"in":"query","name":"kind","required":false,"description":"Exact kind filter from the frozen taxonomy (§1); a single kind or a comma-separated list.","schema":{"type":"string"},"index$":5},{"in":"query","name":"severity","required":false,"description":"Exact severity filter; a single level or a comma-separated list.","schema":{"type":"string"},"index$":6},{"in":"query","name":"min_severity","required":false,"description":"Severity floor — this level and everything more severe (§2).","schema":{"type":"string","description":"Severity levels (docs §2, reusing `AlertRule::SEVERITIES`).","enum":["info","warning","error","critical"],"x-ref":"#/components/schemas/OpsSignalSeverity"},"index$":7},{"in":"query","name":"hosted_app_id","required":false,"description":"Hosted app filter; accepts an `app_…` public id, a raw id, or the app slug.","schema":{"type":"string"},"index$":8},{"in":"query","name":"since","required":false,"description":"ISO8601 lower bound on `occurred_at`.","schema":{"type":"string"},"index$":9},{"in":"query","name":"unacked","required":false,"description":"When true, return only signals with no `acked_at`.","schema":{"type":"boolean"},"index$":10},{"in":"query","name":"source","required":false,"description":"Signal source provider filter (docs §6e) — a single provider or a comma-separated list. An unrecognized provider is a 422 rather than an empty page.","schema":{"type":"string"},"index$":11},{"in":"query","name":"integration_id","required":false,"description":"Narrow to one signal integration. Accepts the integration's raw id, and its `sint_…` public id once the integration model ships.","schema":{"type":"string"},"index$":12},{"in":"query","name":"subscription_id","required":false,"description":"Resume a subscription (`sub_…`): its stored filters supply the defaults for any filter left blank, and its `last_acked_signal_id` becomes the default ascending `after_id`.","schema":{"type":"string"},"index$":13}]},"GET /api/v1/organizations/{organization_id}/signals/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/signals/{id}/agent_prompt":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"signal.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signals/{id}/ack"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const signal_ref01_ent = client.Signal()
    let signal_ref01_data = setup.data.new.signal['signal_ref01']
    signal_ref01_data['organization_id'] = setup.idmap['organization01']

    signal_ref01_data = (await signal_ref01_ent.create(signal_ref01_data)).data()
    assert(null != signal_ref01_data.id)


    // LIST
    const signal_ref01_match: any = {}
    signal_ref01_match['organization_id'] = setup.idmap['organization01']

    const signal_ref01_list = (await signal_ref01_ent.list(signal_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(signal_ref01_list, { id: signal_ref01_data.id })))


    // LOAD
    const signal_ref01_match_dt0: any = {}
    signal_ref01_match_dt0.id = signal_ref01_data.id
    signal_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof signal_ref01_data['organization_id']) ?
      signal_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const signal_ref01_data_dt0 = (await signal_ref01_ent.load(signal_ref01_match_dt0)).data()
    assert(signal_ref01_data_dt0.id === signal_ref01_data.id)


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
      '../../../../.sdk/test/entity/signal/SignalTestData.json')

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
    ['signal01','signal02','signal03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SIGNAL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SIGNAL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SIGNAL_ENTID']
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
  
