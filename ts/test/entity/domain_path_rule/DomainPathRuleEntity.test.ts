

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


describe('DomainPathRuleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DomainPathRule()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DomainPathRule().list({"app_id":1,"domain_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain_path_rule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action_kind":{"a":true,"h":"Action Kind","n":"action_kind","r":true,"t":"`$STRING`","key$":"action_kind","index$":0},"app_service_endpoint_id":{"a":true,"h":"App Service Endpoint Id","n":"app_service_endpoint_id","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_endpoint_id","index$":1},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":2},"backend_ref":{"a":true,"h":"Backend Ref","n":"backend_ref","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"backend_ref","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"last_error":{"a":true,"h":"Last Error","n":"last_error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_error","index$":6},"path_prefix":{"a":true,"h":"Path Prefix","n":"path_prefix","r":true,"t":"`$STRING`","key$":"path_prefix","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":8},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":9}},"id":{"field":"id","name":"id"},"name":"domain_path_rule","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["app_service_endpoint_id","app_service_id","path_prefix"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules","q":{"exist":["app_id","domain_id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"}],"t":{"req":"`reqdata`","res":"`body.path_rule`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules","q":{"exist":["app_id","domain_id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"}],"t":{"req":"`reqdata`","res":"`body.path_rules`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","q":{"exist":["app_id","domain_id","id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.path_rule`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["app_service_endpoint_id","app_service_id","path_prefix"],"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","q":{"exist":["app_id","domain_id","id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.path_rule`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","q":{"exist":["app_id","domain_id","id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["app_service_endpoint_id","app_service_id","path_prefix"],"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","q":{"exist":["app_id","domain_id","id"]},"r":{"param":{"app_id":"app_id","domain_id":"domain_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"domains"},{"var":"domain_id"},{"lit":"path_rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.path_rule`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"domain_path_rule","name__orig":"domain_path_rule","Name":"DomainPathRule","name_":"domain_path_rule","name-":"domain-path-rule","NAME":"DOMAIN_PATH_RULE","index$":226}, {"active":true,"entity":"domain_path_rule","key$":"BasicDomainPathRuleFlow","kind":"basic","name":"BasicDomainPathRuleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"domain_path_rule_ref01"},"m":{"app_id":"app01","domain_id":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01","domain_id":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domain_path_rule_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01","domain_id":"domain01"},"i":{"ref":"domain_path_rule_ref01","srcdatavar":"domain_path_rule_ref01_data","suffix":"_up0","textfield":"action_kind"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_path_rule_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"domain_path_rule_ref01","srcdatavar":"domain_path_rule_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","domain_id":"domain01","id":"domain_path_rule01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_path_rule_ref01"}}],"index$":3,"route":"GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"domain_path_rule_ref01","suffix":"_rm0"},"m":{"app_id":"app01","domain_id":"domain01","id":"domain_path_rule01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01","domain_id":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"domain_path_rule_ref01"}}],"index$":5}]}, 'DomainPathRule', {"POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["path_prefix","app_service_id"],"properties":{"path_prefix":{"type":"string","key$":"path_prefix"},"app_service_id":{"type":"string","key$":"app_service_id"},"app_service_endpoint_id":{"type":"string","key$":"app_service_endpoint_id"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppDomainPathRuleUpsertPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["path_prefix","app_service_id"],"properties":{"path_prefix":{"type":"string","key$":"path_prefix"},"app_service_id":{"type":"string","key$":"app_service_id"},"app_service_endpoint_id":{"type":"string","key$":"app_service_endpoint_id"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppDomainPathRuleUpsertPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["path_prefix","app_service_id"],"properties":{"path_prefix":{"type":"string","key$":"path_prefix"},"app_service_id":{"type":"string","key$":"app_service_id"},"app_service_endpoint_id":{"type":"string","key$":"app_service_endpoint_id"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppDomainPathRuleUpsertPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"domain_path_rule.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules","domain_path_rule.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","domain_path_rule.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}","domain_path_rule.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const domain_path_rule_ref01_ent = client.DomainPathRule()
    let domain_path_rule_ref01_data = setup.data.new.domain_path_rule['domain_path_rule_ref01']
    domain_path_rule_ref01_data['app_id'] = setup.idmap['app01']
    domain_path_rule_ref01_data['domain_id'] = setup.idmap['domain01']

    domain_path_rule_ref01_data = (await domain_path_rule_ref01_ent.create(domain_path_rule_ref01_data)).data()
    assert(null != domain_path_rule_ref01_data.id)


    // LIST
    const domain_path_rule_ref01_match: any = {}
    domain_path_rule_ref01_match['app_id'] = setup.idmap['app01']
    domain_path_rule_ref01_match['domain_id'] = setup.idmap['domain01']

    const domain_path_rule_ref01_list = (await domain_path_rule_ref01_ent.list(domain_path_rule_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(domain_path_rule_ref01_list, { id: domain_path_rule_ref01_data.id })))


    // UPDATE
    const domain_path_rule_ref01_data_up0: any = {}
    domain_path_rule_ref01_data_up0.id = domain_path_rule_ref01_data.id
    domain_path_rule_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    domain_path_rule_ref01_data_up0['domain_id'] = setup.idmap['domain_id'] ?? setup.idmap['domain01']

    const domain_path_rule_ref01_markdef_up0 = { name: 'action_kind', value: 'Mark01-domain_path_rule_ref01_' + setup.now }
    ;(domain_path_rule_ref01_data_up0 as any)[domain_path_rule_ref01_markdef_up0.name] = domain_path_rule_ref01_markdef_up0.value

    const domain_path_rule_ref01_resdata_up0 = (await domain_path_rule_ref01_ent.update(domain_path_rule_ref01_data_up0)).data()
    assert(domain_path_rule_ref01_resdata_up0.id === domain_path_rule_ref01_data_up0.id)

    assert((domain_path_rule_ref01_resdata_up0 as any)[domain_path_rule_ref01_markdef_up0.name] === domain_path_rule_ref01_markdef_up0.value)


    // LOAD
    const domain_path_rule_ref01_match_dt0: any = {}
    domain_path_rule_ref01_match_dt0.id = domain_path_rule_ref01_data.id
    domain_path_rule_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    domain_path_rule_ref01_match_dt0['domain_id'] = setup.idmap['domain_id'] ?? setup.idmap['domain01']
    const domain_path_rule_ref01_data_dt0 = (await domain_path_rule_ref01_ent.load(domain_path_rule_ref01_match_dt0)).data()
    assert(domain_path_rule_ref01_data_dt0.id === domain_path_rule_ref01_data.id)


    // REMOVE
    const domain_path_rule_ref01_match_rm0: any = { id: domain_path_rule_ref01_data.id }
    domain_path_rule_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    domain_path_rule_ref01_match_rm0['domain_id'] = setup.idmap['domain_id'] ?? setup.idmap['domain01']
    await domain_path_rule_ref01_ent.remove(domain_path_rule_ref01_match_rm0)
  

    // LIST
    const domain_path_rule_ref01_match_rt0: any = {}
    domain_path_rule_ref01_match_rt0['app_id'] = setup.idmap['app01']
    domain_path_rule_ref01_match_rt0['domain_id'] = setup.idmap['domain01']

    const domain_path_rule_ref01_list_rt0 = (await domain_path_rule_ref01_ent.list(domain_path_rule_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(domain_path_rule_ref01_list_rt0, { id: domain_path_rule_ref01_data.id })))


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
      '../../../../.sdk/test/entity/domain_path_rule/DomainPathRuleTestData.json')

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
    ['domain_path_rule01','domain_path_rule02','domain_path_rule03','app01','app02','app03','domain01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID']
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
  
