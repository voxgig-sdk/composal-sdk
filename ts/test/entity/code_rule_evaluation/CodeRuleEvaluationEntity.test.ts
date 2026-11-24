

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


describe('CodeRuleEvaluationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CodeRuleEvaluation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CodeRuleEvaluation().create({"organization_id":1,"repo_id":"x","diff":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'code_rule_evaluation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"advisory":{"a":true,"h":"Advisory","n":"advisory","r":true,"t":"`$BOOLEAN`","key$":"advisory","index$":0},"coverage":{"a":true,"h":"Coverage","n":"coverage","r":true,"t":"`$OBJECT`","key$":"coverage","index$":1},"diff":{"a":true,"h":"Diff","n":"diff","r":true,"sh":"UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB","t":"`$STRING`","key$":"diff","index$":2},"duration_ms":{"a":true,"h":"Duration Ms","n":"duration_ms","r":true,"t":"`$INTEGER`","key$":"duration_ms","index$":3},"evaluator_version":{"a":true,"h":"Evaluator Version","n":"evaluator_version","r":false,"t":"`$STRING`","key$":"evaluator_version","index$":4},"input_digest":{"a":true,"h":"Input Digest","n":"input_digest","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"input_digest","index$":5},"limits":{"a":true,"h":"Limits","n":"limits","r":false,"t":"`$OBJECT`","key$":"limits","index$":6},"model":{"a":true,"h":"Model","n":"model","r":false,"t":"`$STRING`","key$":"model","index$":7},"requests":{"a":true,"h":"Requests","n":"requests","r":true,"t":"`$OBJECT`","key$":"requests","index$":8},"schema_version":{"a":true,"h":"Schema Version","n":"schema_version","r":true,"t":"`$INTEGER`","key$":"schema_version","index$":9},"snapshot_digest":{"a":true,"h":"Snapshot Digest","n":"snapshot_digest","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"snapshot_digest","index$":10},"unchecked":{"a":true,"h":"Unchecked","n":"unchecked","r":true,"t":"`$ARRAY`","key$":"unchecked","index$":11},"verdicts":{"a":true,"h":"Verdicts","n":"verdicts","r":true,"t":"`$ARRAY`","key$":"verdicts","index$":12}},"name":"code_rule_evaluation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["diff"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"code_rules"},{"lit":"evaluations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"key$":"code_rule_evaluation","name__orig":"code_rule_evaluation","Name":"CodeRuleEvaluation","name_":"code_rule_evaluation","name-":"code-rule-evaluation","NAME":"CODE_RULE_EVALUATION","index$":180}, {"active":true,"entity":"code_rule_evaluation","key$":"BasicCodeRuleEvaluationFlow","kind":"basic","name":"BasicCodeRuleEvaluationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"code_rule_evaluation_ref01"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CodeRuleEvaluation', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["diff"],"additionalProperties":true,"properties":{"diff":{"type":"string","description":"UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB","key$":"diff"}},"x-ref":"#/components/schemas/CodeRuleEvaluationInput"}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"code_rule_evaluation.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const code_rule_evaluation_ref01_ent = client.CodeRuleEvaluation()
    let code_rule_evaluation_ref01_data = setup.data.new.code_rule_evaluation['code_rule_evaluation_ref01']
    code_rule_evaluation_ref01_data['organization_id'] = setup.idmap['organization01']
    code_rule_evaluation_ref01_data['repo_id'] = setup.idmap['repo01']

    code_rule_evaluation_ref01_data = (await code_rule_evaluation_ref01_ent.create(code_rule_evaluation_ref01_data)).data()
    assert(null != code_rule_evaluation_ref01_data)


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
      '../../../../.sdk/test/entity/code_rule_evaluation/CodeRuleEvaluationTestData.json')

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
    ['code_rule_evaluation01','code_rule_evaluation02','code_rule_evaluation03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CODE_RULE_EVALUATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CODE_RULE_EVALUATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CODE_RULE_EVALUATION_ENTID']
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
  
